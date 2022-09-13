import { flags, SfdxCommand } from "@salesforce/command";
import {
	HooksConfig,
	readHooksConfig,
	writeHooksConfig,
} from "../../../configUtils";

type HookName = keyof HooksConfig;
export default class DisablePredefinedHook extends SfdxCommand {
	public static description = "Disable predefined hook";
	public static flagsConfig = {
		name: flags.enum<HookName>({
			description: "Name of predefined hook to disable",
			options: ["postDeploymentHook"],
			char: "n",
			required: true,
		}),
	};

	async run() {
		const hookName = this.flags["name"];
		const existingHook = await readHooksConfig();
		existingHook[hookName] = false;
		return writeHooksConfig(existingHook);
	}
}
