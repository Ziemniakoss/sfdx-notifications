# Notifications for SFDX

[![npm version](https://img.shields.io/npm/v/sfdx-notifications)](https://www.npmjs.com/package/sfdx-notifications)

Unofficial plugin for SFDX notifications.
Adds special hook named "notification" that can be used by other commands to dispatch custom notification.

## How to use

If you are using linux, see [node-notifier requirements](https://www.npmjs.com/package/node-notifier).

### Install

```
sfdx plugins:install sfdx-notifications
```

### Managing notifications

To list all possible commands, use

```
sfdx notifications
```

To test if notifications work on your system, use

```
sfdx notifications:dispatch
```

You can register notifications for command by using

```
sfdx notificaitons:register
```

If you want to stop receiving notifications for command, use

```
sfdx notifications:unregister
```

To list registered notifications, use

```
sfdx notifications:list
```

### Notification hook

From version 2.1.0 onwards, notification hook is supported.
It can be used to dispatch custom notifications from plugins.

```ts
// Notification supported by [node-notifier](https://www.npmjs.com/package/node-notifier)
const notification = {
	title: "Your custom title",
	message: "Your custom message",
	label: "SFDX",
};
return this.config.runHook("notification", { notification });
```
