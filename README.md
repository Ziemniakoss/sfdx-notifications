# Notifications for SFDX

Unofficial plugin for SFDX notifications.

## How to use

If you are using linux, see [node-notifier requirements](https://www.npmjs.com/package/node-notifier)

### Install

```
sfdx plugins:install sfdx-notifications
```

### Managing notifications

You can register notifications for command by using

```
sfdx notificaitons:register
```

If you want to stop receiving notifications for command, use

```
sfdx notifications:inregister
```

To list registered notifications, use

```
sfdx notifications:list
```
