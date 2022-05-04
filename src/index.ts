import { SEPARATOR, SINGLE, ALL } from './config';

export function fill(pattern: string, params: Record<string, string | string[]>) {
  const patternSegments = pattern.split(SEPARATOR);
	const patternLength = patternSegments.length;

	const result: string[] = [];

  for (let i = 0; i < patternLength; i++) {
    const currentPattern = patternSegments[i];
		const patternChar = currentPattern[0];
		const patternParam = currentPattern.slice(1);
		const paramValue = params[patternParam];

    if (patternChar === ALL) {
			// Check that it isn't undefined
			if (paramValue !== void 0)
				result.push([].concat(paramValue as any).join(SEPARATOR)); // Ensure it's an array

			// Since # wildcards are always at the end, break out of the loop
			break;
		} else if (patternChar === SINGLE) {
      result.push('' + paramValue);
    } else {
      result.push(currentPattern);
    }
  }

  return result.join(SEPARATOR);
}

export function exec(
  pattern: string,
  topic: string
) {
	return matches(pattern, topic) ? extract(pattern, topic) : null;
}

export function matches(pattern: string, topic: string) {
	const patternSegments = pattern.split(SEPARATOR);
	const topicSegments = topic.split(SEPARATOR);

	const patternLength = patternSegments.length;
	const topicLength = topicSegments.length;
	const lastIndex = patternLength - 1;

	for(let i = 0; i < patternLength; i++){
		const currentPattern = patternSegments[i];
		var patternChar = currentPattern[0];
		const currentTopic = topicSegments[i];

		if (!currentTopic && !currentPattern)
			continue;

		if (!currentTopic && currentPattern !== ALL) return false;

		// Only allow # at end
		if (patternChar === ALL)
			return i === lastIndex;

		if (patternChar !== SINGLE && currentPattern !== currentTopic)
			return false;
	}

	return patternLength === topicLength;
}

export function extract(
  pattern: string,
  topic: string
) {
	const params: Record<string, string | string[]> = {};
	const patternSegments = pattern.split(SEPARATOR);
	const topicSegments = topic.split(SEPARATOR);

	const patternLength = patternSegments.length;

	for (let i = 0; i < patternLength; i++) {
		const currentPattern = patternSegments[i];
		const patternChar = currentPattern[0];

		if (currentPattern.length === 1)
			continue;
		if (patternChar === ALL) {
			params[currentPattern.slice(1)] = topicSegments.slice(i);
			break;
		} else if (patternChar === SINGLE) {
			params[currentPattern.slice(1)] = topicSegments[i];
		}
	}

	return params;
}

export function clean(pattern: string) {
	const patternSegments = pattern.split(SEPARATOR);
	const patternLength = patternSegments.length;

	const cleanedSegments = [];

	for (let i = 0; i < patternLength; i++) {
		const currentPattern = patternSegments[i];
		const patternChar = currentPattern[0];

		if (patternChar === ALL) {
			cleanedSegments.push(ALL);
		} else if (patternChar === SINGLE) {
			cleanedSegments.push(SINGLE);
		} else {
			cleanedSegments.push(currentPattern);
		}
	}

	return cleanedSegments.join('/');
}
