import { SfdxCommand } from "@salesforce/command";
import { HooksConfig, readHooksConfig } from "../../../configUtils";

const hookNameToMessage: Record<keyof HooksConfig, string> = {
	postDeploymentHook: "Show notification with deployment information",
};

export default class ListPredefinedHooks extends SfdxCommand {
	public static description = "List predefined hooks and their configuration";
	async run() {
		const config = await readHooksConfig();
		const rows = Object.keys(config).map((hookName) => ({
			hookName,
			description: hookNameToMessage[hookName] ?? "",
			enabled: config[hookName],
		}));

		this.ux.table(rows, {
			columns: [
				{ key: "hookName", label: "Hook Name" },
				{ key: "description", label: "Description" },
				{ key: "enabled", label: "Enabled" },
			],
		});
	}
}
