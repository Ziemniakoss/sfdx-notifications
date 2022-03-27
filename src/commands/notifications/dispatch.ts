import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { notify, } from "node-notifier";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages(
	"sfdx-notifications",
	"notifications_dispatch"
);

export default class GenerateSObjectTypings extends SfdxCommand {
	public static description = messages.getMessage("description");

	public async run(): Promise<unknown> {
		this.ux.log(messages.getMessage("console_message"));
		const notificaton = {
			title: messages.getMessage("title"),
			message: messages.getMessage("message"),
			appID: "SFDX",
			label: "SFDX",
			"app-name": "SFDX"
		};
		notify(notificaton);
		return notificaton;
	}
}
