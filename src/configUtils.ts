import { promises, existsSync } from "fs";
import { dirname, join } from "path";
import * as os from "os";

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
	notificationConfigs: Record<string, NotificationConfig>
) {
	const configFile = getConfigPath();
	await mkdirs(dirname(configFile));
	return promises.writeFile(
		configFile,
		JSON.stringify(notificationConfigs, null, 4)
	);
}

function getConfigPath() {
	return join(os.homedir(), ".config", "sfdx-notifications", "config.json");
}
export async function readConfig(): Promise<
	Record<string, NotificationConfig>
> {
	const configFile = getConfigPath();
	if (!existsSync(configFile)) {
		return {};
	}
	return promises
		.readFile(configFile, "utf-8")
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

export interface HooksConfig {
	postDeploymentHook: boolean;
}

function getHooksConfigPath(): string {
	return join(
		os.homedir(),
		".config",
		"sfdx-notifications",
		"hooks-config.json"
	);
}

export async function readHooksConfig(): Promise<HooksConfig> {
	const configFromFile: HooksConfig = await promises
		.readFile(getHooksConfigPath(), "utf-8")
		.then((content) => JSON.parse(content))
		.catch((_) => ({
			postDeploymentHook: true,
		}));
	return {
		postDeploymentHook: true,
		...configFromFile,
	};
}

export async function writeHooksConfig(hooksConfig: HooksConfig) {
	const path = getHooksConfigPath();
	await mkdirs(dirname(path));
	return promises.writeFile(path, JSON.stringify(hooksConfig, null, 4));
}

async function mkdirs(dir: string) {
	while (!existsSync(dir)) {
		await mkdirs(dirname(dir));
	}
	if (!existsSync(dir)) {
		await promises.mkdir(dir);
	}
}
