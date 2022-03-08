# Notifications for SFDX

Unofficial plugin for SFDX notifications.

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
