import { promises, existsSync } from "fs";
import { join } from "path";

export const CONFIG_FILE_NAME = "config.json";

export class MalformedConfigError extends Error {
	constructor(message) {
		super(message);
	}
}

export interface NotificationConfig {
	title?: string;
	message?: string;
	icon?: string;
}

export async function writeConfig(
	configDir: string,
	notificationConfigs: Record<string, NotificationConfig>
) {
	if (!existsSync(configDir)) {
		await promises.mkdir(configDir);
	}
	const configPath = join(configDir, CONFIG_FILE_NAME);
	return promises.writeFile(
		configPath,
		JSON.stringify(notificationConfigs, null, 4)
	);
}

export async function readConfig(
	configDir: string
): Promise<Record<string, NotificationConfig>> {
	const fileName = join(configDir, CONFIG_FILE_NAME);
	if (!existsSync(fileName)) {
		return {};
	}
	return promises
		.readFile(fileName, "utf-8")
		.then((fileContent) => JSON.parse(fileContent))
		.then((parsedConfig) => {
			if (typeof parsedConfig == "object") {
				return parsedConfig;
			}
			throw new MalformedConfigError(
				`Config must be object, was ${typeof parsedConfig}`
			);
		});
}
