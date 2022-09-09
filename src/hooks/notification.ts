import { notify, } from "node-notifier";


async function notificationHook(notificationEvent) {
	try {
		notify(notificationEvent)
	}catch (e){}
}

export default notificationHook
