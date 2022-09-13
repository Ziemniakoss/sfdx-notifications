import { flags, SfdxCommand } from "@salesforce/command";
import {
	HooksConfig,
	readHooksConfig,
	writeHooksConfig,
} from "../../../configUtils";

type HookName = keyof HooksConfig;
export default class EnablePredefinedHook extends SfdxCommand {
	public static description = "Enable predefined hook";
	public static flagsConfig = {
		name: flags.enum<HookName>({
			description: "Name of predefined hook to enable",
			options: ["postDeploymentHook"],
			char: "n",
			required: true,
		}),
	};

	async run() {
		const hookName = this.flags["name"];
		const existingHook = await readHooksConfig();
		existingHook[hookName] = true;
		return writeHooksConfig(existingHook);
	}
}
