
export const superAdminRoutes = [
  {
    "name": "System",
    "path": "/system",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
      "title": "用户",
      "icon": "user",
      "noCache": false,
      "link": null
    },
    "children": [
      {
        "name": "User",
        "path": "user",
        "hidden": false,
        "component": "system/user/index",
        "meta": {
          "title": "用户管理",
          "noCache": false,
          "link": null
        }
      },
    ]
  },
  {
    "name": "AppIdentifier",
    "path": "/appIdentifier",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
      "title": "App标识 ",
      "icon": "build",
      "noCache": false,
      "link": null
    },
    "children": [
      {
        "name": "AdminAppIdentifier",
        "path": "adminAppIdentifier",
        "hidden": false,
        "component": "appIdentifier/adminAppIdentifier",
        "meta": {
          "title": "App标识管理",
          "noCache": false,
          "link": null
        }
      },
    ]
  }

]
