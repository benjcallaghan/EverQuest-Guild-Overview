// TypeScript will infer a string union type from the literal values passed to
// this function. Without `extends string`, it would instead generalize them
// to the common string type.
function StringUnion<UnionType extends string>(...values: UnionType[]): {
	guard: (value: string) => value is UnionType,
	check: (value: string) => UnionType,
	readonly values: UnionType[],
	readonly type: UnionType
} {
	Object.freeze(values);
	const valueSet: Set<string> = new Set(values);

	const guard = (value: string): value is UnionType => {
		return valueSet.has(value);
	};

	const check = (value: string): UnionType => {
		if (!guard(value)) {
			const actual = JSON.stringify(value);
			const expected = values.map(s => JSON.stringify(s)).join(' | ');
			throw new TypeError(`Value '${actual}' is not assignable to type '${expected}'.`);
		}
		return value;
	};

	const unionNamespace = { guard, check, values };
	return Object.freeze(unionNamespace as typeof unionNamespace & { type: UnionType });
}

const Format = StringUnion('json', 'xml');
export type Format = typeof Format.type;

const Verb = StringUnion('get', 'count');
export type Verb = typeof Verb.type;

const Namespace = StringUnion('eq2', 'ps2:v2', 'ps2', 'ps2ps4us:v2', 'ps2ps4us', 'ps2ps4eu:v2', 'ps2ps4eu', 'dcuo:v1', 'dcuo');
export type Namespace = typeof Namespace.type;

const StringFilterMatch = StringUnion('equals', 'startsWith', 'contains', 'notEqual');
export type StringFilterMatch = typeof StringFilterMatch.type;

/**
 * Defines a query string that filters the results by the specified string value.
 */
export interface StringFilter {
	/**
	 * The field that should be compared. If the field has a hierarchy, it can be referenced using a dot (".") notation.
	 */
	field: string;

	/**
	 * The value that the provided field should be compared against.
	 */
	value: string;

	/**
	 * The method that should be used to compare the provided field and value. The default comparison is `equals`.
	 */
	match?: StringFilterMatch;
}

const NumberFilterMatch = StringUnion('equals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'notEqual');
export type NumberFilterMatch = typeof NumberFilterMatch.type;

/**
 * Defines a query string that filters the results by the specified numeric value.
 */
export interface NumberFilter {
	/**
	 * The field that should be compared. If the field has a heirarchy, it can be referenced using a dot (".") notation.
	 */
	field: string;

	/**
	 * The value that the provided field should be compared against.
	 */
	value: number;

	/**
	 * The method that should be used to compare the provided field and value. The default comparison is `equals`.
	 */
	match?: NumberFilterMatch;
}

const filterModifiers: Record<StringFilterMatch | NumberFilterMatch, string> = {
	equals: '',
	lessThan: '<',
	lessThanOrEqual: '[',
	greaterThan: '>',
	greaterThanOrEqual: ']',
	startsWith: '^',
	contains: '*',
	notEqual: '!'
};

const SortDirection = StringUnion('ascending', 'descending');
export type SortDirection = typeof SortDirection.type;
const sortValues: Record<SortDirection, string> = {
	ascending: '1',
	descending: '-1'
};

/**
 * Defines a query string that sorts the results by the provided field.
 */
export interface Sort {
	/**
	 * The field that should be sorted.
	 */
	field: string;

	/**
	 * The direction that the results should be sorted.
	 */
	direction?: SortDirection;
}

/**
 * Defines a query string that resolves information by merging data from another collection.
 */
export interface Resolve {
	/**
	 * The field that should be resolved.
	 */
	field: string;

	/**
	 * Only include the provided fields from the resolved object within the result. By default, all fields are included.
	 */
	show?: string[];
}

/**
 * Defines a query string that dynamically joins (resolves) multiple data types in one query.
 */
export interface Join {
	/**
	 * The collection name to join to.
	 */
	type: string;

	/**
	 * The field on this type to join on. Will default to {this_type}_id or {other_type}_id if not provided.
	 */
	on?: string;

	/**
	 * The field on the joined type to join to. Will default to on if on is provided, otherwise will default to
	 * {this_type}_id or {other_type}_id if not provided.
	 */
	to?: string;

	/**
	 * `false` if joined data is not a list, `true` if it is a list. Defaults to `false` - not a list.
	 */
	list?: boolean;

	/**
	 * List of fields to show. This cannot be used in conjunction with `hide`.
	 */
	show?: string[];

	/**
	 * List of fields to hide. This cannot be used in conjunction with `show`.
	 */
	hide?: string[];

	/**
	 * The field name where the joined data should be injected into the returned document.
	 */
	inject_at?: string;

	/**
	 * Filter terms for the join query. Unfortunately, the terms functionality will not work on all data types. If the data
	 * type can not be filtered by a field directly, terms will not function either.
	 */
	terms?: (StringFilter | NumberFilter)[];

	/**
	 * `true` if you wish to do an outer join (include non-matches), `false` if you wish to do an inner join (exclude non-matches).
	 * Defaults to `true` - do an outer join, include non-matches.
	 */
	outer?: boolean;

	/**
	 * A secondary join that links the resolved data type to another data type in one query.
	 */
	nestedJoin?: Join;
}

/**
 * Defines a query string that rearranges list of data into trees of data.
 */
export interface Tree {
	/**
	 * The field to remove and use as in the data structure, or tree.
	 */
	field: string;

	/**
	 * `false` if the tree data is not a list, `true` if it is a list. Defaults to `false`.
	 */
	list?: boolean;

	/**
	 * A prefix to add to the field value to make it more readable.
	 */
	prefix?: string;

	/**
	 * Used to tell the tree where to start. By default, the list of objects at the root will be formatted as a tree.
	 */
	start?: string;
}

/**
 * Defines the options that will be used to build a request to Census REST API.
 */
export interface CensusUrlOptions {
	/**
	 * The _service ID_ is used to identify the customer of the Census API for tracking and quality of services issues.
	 * The _service ID_ is an alphanumeric value. All service IDs will be of the format `s:<the service id>`.
	 */
	serviceId?: string;

	/**
	 * The results of a call to the REST interface will be in either JavaScript Object Notation (`json`) or xml.
	 * `Json` is the default.
	 */
	format?: Format;

	/**
	 * This informs the REST interface about the type of request that is being made. The following values are supported
	 * across all games, however, as each game has its own data needs, different verbs may be made available on a per game
	 * basis. Some collections like 'characters_online_status', for example, do not support the count verb.
	 * @value `get` Retrieve the game data that matches the requested criteria
	 * @value `count` Retrieve the number of game data objects that match the request critieria.
	 */
	verb: Verb;

	/**
	 * @value `eq2` EverQuest II - Stable version.
	 * @value `ps2:v1` PlanetSide 2 (PC) - Deprecated. Please use `ps2:v2`.
	 * @value `ps2:v2` PlanetSide 2 (PC) - Stable version.
	 * @value `ps2` PlanetSide 2 (PC) - Alias for `ps2:v2`.
	 * @value `ps2ps4us:v2` US PlanetSide 2 (Playstation 4) - Stable version.
	 * @value `ps2ps4us` US PlanetSide 2 (Playstation 4) - Alias for `ps2ps4us:v2`.
	 * @value `ps2ps4eu:v2` EU PlanetSide 2 (Playstation 4) - Stable version.
	 * @value `ps2ps4eu` EU PlanetSide 2 (Playstation 4) - Alias for `ps2ps4eu:v2`.
	 * @value `dcuo:v1` DC Universe Online (PC and Playstation 3) - Stable version.
	 * @value `dcuo` DC Universe Online (PC and Playstation 3) - Alias for `dcuo:v1`.
	 */
	namespace: Namespace;

	/**
	 * Supported collections are dynamic and dependent on the game providing data to the service.
	 * A list of all collections available for a particular game can be found by leaving all remaining fields empty.
	 */
	collection?: string;

	/**
	 * Most objects have a unique identifier, which is used for a direct link to the information about that object.
	 * This can be found within the structure by the top-level "[collection]_id" field. All results will have this identifier,
	 * even if all other information is hidden.
	 */
	identifier?: string;

	/**
	 * The "field" portion of a query string corresponds to a particular field within a particular object within the collection.
	 *
	 * If the field has a hierarchy, it can be referenced using a dot (".") notation.
	 *
	 * If multiple search conditions are provided within the query string, they will be combined as a Boolean 'AND' operation.
	 *
	 * A regex search can be combined with `exactMatchFirst` in order to show exact matches at the top of the result list.
	 *
	 * A match type may be specified to further enhance the results provided. *Only one match type may be used*.
	 */
	filter?: (StringFilter | NumberFilter)[];

	/**
	 * Only include the provided fields from the object within the result. This cannot be used in conjuction with `hide`.
	 */
	show?: string[];

	/**
	 * Include all fields except the provided fields from the object within the result. This cannot be used in conjuction
	 * with `show`.
	 */
	hide?: string[];

	/**
	 * Sort the results by the field(s) provided. The sort direction may optionally be provided.
	 */
	sort?: Sort[];

	/**
	 * Include objects where the specified field exists, regardless of the value within that field.
	 */
	has?: string[];

	/**
	 * "Resolve" information by merging data from another collection and include the detailed object information for the
	 * provided fields from the object within the result. Please note that the resolve will only function if the initial
	 * query contains the field to be resolved on.
	 */
	resolve?: Resolve[];

	/**
	 * Set whether a search should be case-sensitive. `true` is the default. Note that using this command may slow down
	 * your queries. If a lower case version of a field is available use that instead for faster performance.
	 */
	caseSensitive?: boolean;

	/**
	 * Limit the results to at most N objects. This cannot be used in conjunction with `limitPerDB`.
	 */
	limit?: number;

	/**
	 * Limit the results to at most (N * number of databases) objects. The data type ps2/character is distributed randomly
	 * across 20 databases. Using `limitPerDB` will have more predictable results on ps2/character than `limit` will. This
	 * cannot be used in conjunction with `limit`.
	 */
	limitPerDB?: number;

	/**
	 * Start with the Nth object within the results of the query. Please note that `start` will have unusual behavior when
	 * querying ps2/character which is distributed randomly across 20 databases.
	 */
	start?: number;

	/**
	 * Include NULL values in the result. By default this is false. Please note this command will not be applied to all
	 * collections until ps2:v2.
	 */
	includeNull?: boolean;

	/**
	 * For internationalized strings, remove all translations except the one specified.
	 */
	language?: string;

	/**
	 * Meant to replace `resolve`, useful for dynamically joining (resolving) multiple data types in one query.
	 */
	join?: Join[];

	/**
	 * Useful for rearranging lists of data into trees of data.
	 */
	tree?: Tree;

	/**
	 * Shows the time taken by the involved server-side queries and resolves.
	 */
	includeTiming?: boolean;

	/**
	 * When using a regex search, `exactMatchFirst` will cause exact matches of the regex value to appear at the top of
	 * the result list despite the value of `sort`.
	 */
	exactMatchFirst?: boolean;

	/**
	 * Get the distinct values of the given field. Results are capped at 20,000 values.
	 */
	distinct?: string;

	/**
	 * If `true`, query will be retried one time. Default value is `true`. If you prefer your query to fail quickly pass
	 * `false`.
	 */
	retry?: boolean;
}

function checkFilter(filter: StringFilter | NumberFilter): StringFilter | NumberFilter {
	filter.match = filter.match || 'equals';
	switch (typeof filter.value) {
		case 'string':
			StringFilterMatch.check(filter.match);
			break;
		case 'number':
			NumberFilterMatch.check(filter.match);
			break;
		default:
			throw new Error('Only numbers and strings can be used as filter queries.');
	}
	return filter;
}

function buildJoin(join: Join): string {
	if (join.show && join.hide) {
		throw new Error('Show and Hide cannot be used in the same join request.');
	}

	return Object.entries(join)
		// Keep those items that have a value (including false).
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => getProp(key, value))
		.join('^');

	function getProp(key: string, value: any): string {
		if (key === 'terms') {
			const terms = join.terms.map(term => {
				term = checkFilter(term);
				return `${term.field}=${filterModifiers[term.match]}${term.value}`;
			}).join('\'');
			return `terms:${terms}`;
		}
		if (key === 'nestedJoin') {
			return `(${buildJoin(join.nestedJoin)})`;
		}
		if (typeof value === 'boolean') {
			return `${key}:${+value}`;
		}
		if (Array.isArray(value)) {
			return `${key}:${value.join('\'')}`;
		}
		return `${key}:${value}`;
	}
}

type QueryOptions = Exclude<keyof CensusUrlOptions, 'serviceId' | 'format' | 'verb' | 'namespace' | 'collection' | 'identifier'>;
type Mappings = {
	[K in QueryOptions]-?: string | ((url: URL, value: CensusUrlOptions[K]) => void);
};
const mappings: Mappings = {
	filter: (url, value) => value.forEach(
		filter => {
			filter = checkFilter(filter);
			url.searchParams.append(filter.field, filterModifiers[filter.match] + filter.value);
		}
	),
	show: 'c:show',
	hide: 'c:hide',
	sort: (url, value) => {
		const sorts = value.map(sort => {
			const direction = sort.direction && SortDirection.check(sort.direction);
			return direction ? `${sort.field}:${sortValues[direction]}` : sort.field;
		});
		url.searchParams.append('c:sort', sorts.join(','));
	},
	has: 'c:has',
	resolve: (url, value) => {
		const resolves = value.map(
			resolve => resolve.show ? `${resolve.field}(${resolve.show.join(',')})` : resolve.field
		);
		url.searchParams.append('c:resolve', resolves.join(','));
	},
	caseSensitive: 'c:case',
	limit: 'c:limit',
	limitPerDB: 'c:limitPerDB',
	start: 'c:start',
	includeNull: 'c:includeNull',
	language: 'c:lang',
	join: (url, value) => {
		const joins = value.map(join => buildJoin(join));
		url.searchParams.append('c:join', joins.join(','));
	},
	tree: (url, tree) => {
		const fields = Object.entries(tree)
			// Keep those items that have a value (including false).
			.filter(([, value]) => value !== undefined)
			.map(([key, value]) => `${key}:${typeof value === 'boolean' ? +value : value}`);
		url.searchParams.append('c:tree', fields.join('^'));
	},
	includeTiming: 'c:timing',
	exactMatchFirst: 'c:exactMatchFirst',
	distinct: 'c:distinct',
	retry: 'c:retry'
};

/**
 * Builds a URL that can be used to query the Census REST API.
 * @param options The options that will be used to build a request to Census REST API.
 * @returns A URL that can be used to query the Census REST API.
 */
export function build(options: CensusUrlOptions): URL {
	if (options.show && options.show.length && options.hide && options.hide.length) {
		throw new Error('Show and Hide cannot be used in the same request.');
	}

	if (options.limit && options.limitPerDB) {
		throw new Error('Limit and LimitPerDB cannot be used in the same request.');
	}

	const path = [
		options.serviceId,
		options.format && Format.check(options.format),
		Verb.check(options.verb),
		Namespace.check(options.namespace),
		options.collection,
		options.identifier
	]
		.filter(segment => segment) // Filter out empty segments.
		.map(segment => `/${segment}`) // Prefix all segments, even the first.
		.join('');
	const url = new URL(path, 'https://census.daybreakgames.com');

	Object.entries(options)
		// Keep those items that have a value (including false) and are not empty arrays.
		.filter(([, value]) => value !== undefined && (!Array.isArray(value) || value.length))
		.map(([key, value]) => ({ value, map: mappings[key] }))
		// Keep those items that have a map.
		.filter(({ map }) => map)
		.forEach(({ value, map }) => {
			if (typeof map === 'string' && Array.isArray(value)) {
				url.searchParams.append(map, value.join(','));
			} else if (typeof map === 'string') {
				url.searchParams.append(map, value.toString());
			} else {
				map(url, value);
			}
		});

	return url;
}
