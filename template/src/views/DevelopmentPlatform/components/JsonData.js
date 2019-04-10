export const dataModelFun = {
    dataModelJsonTable: function(columnsName, widgetForm, tableNames) {
        var widgetFormCopy = window._.cloneDeep(widgetForm);
        var widgetFormList = widgetFormCopy.list;
        var columnsJsonCopy = window._.cloneDeep(columnsJsons);
        var JsonDataCopy = window._.cloneDeep(JsonDatas);
        var columnsJsonCopyDo = false;
        if (columnsName) {
            window.JsonData = window._.cloneDeep(JsonDatas);
        }
        window._.forEach(widgetFormList, function(value, key) {
            if (value.type !== "table" && value.type !== "blank" && value.type !== "grid") {
                columnsJsonCopy = window._.cloneDeep(columnsJsons);
                if (value["syncStatus"]) {
                    columnsJsonCopy["syncStatus"] = value["syncStatus"];
                }
                if (value["oldName"]) {
                    columnsJsonCopy["oldName"] = value["oldName"];
                }
                columnsJsonCopy.name = value.model;
                columnsJsonCopy.columnComment = value.columnComment;
                columnsJsonCopy.columnLength = value.columnLength;
                columnsJsonCopy.columnPrimary = value.columnPrimar;
                columnsJsonCopy.dbType = value.dbType;
                columnsJsonCopy.mandatory = value.mandatory;
                columnsJsonCopy.queried = value.queried;
                columnsJsonCopy.tableName = tableNames;
                window.JsonData.columns.push(columnsJsonCopy);
            } else {
                if (value.type == "table") {
                    JsonDataCopy = window._.cloneDeep(JsonDatas);
                    JsonDataCopy.tableName = value.label;
                    JsonDataCopy.tableType = 3
                    window._.forEach(value.options.options, function(item, index) {
                        window._.forEach(item.columns[0].list, function(items, index) {
                            columnsJsonCopyDo = true;
                            columnsJsonCopy = window._.cloneDeep(columnsJsons);
                            if (value["syncStatus"]) {
                                columnsJsonCopy["syncStatus"] = value["syncStatus"];
                            }
                            if (value["oldName"]) {
                                columnsJsonCopy["oldName"] = value["oldName"];
                            }
                            columnsJsonCopy.name = items.model;
                            columnsJsonCopy.columnComment = items.columnComment;
                            columnsJsonCopy.columnLength = items.columnLength;
                            columnsJsonCopy.columnPrimary = items.columnPrimar;
                            columnsJsonCopy.dbType = items.dbType;
                            columnsJsonCopy.mandatory = items.mandatory;
                            columnsJsonCopy.queried = items.queried;
                            JsonDataCopy.columns.push(columnsJsonCopy);
                        })
                    })
                    if (columnsJsonCopyDo) {
                        window.JsonData.children.push(JsonDataCopy);
                    }
                }
                if (value.type === "grid") {
                    for (var i = 0; i < value.columns.length; i++) {
                        dataModelFun.dataModelJsonTable("", value.columns[i], tableNames)
                    }
                }
            }
        });
    }
}

export const JsonDatas = {
    "tableName": "",
    "appId": "",
    "remark": "",
    "tableType": "2",
    "masterTable": "",
    "masterFk": "",
    "designDetails": {
        "formStyleDetail": ""
    },
    "columns": [],
    "children": []
}
export const columnsJsons = {
    "oldName": "",
    "isEdit": false,
    "columnComment": "",
    "columnLength": "255",
    "columnPrimary": false,
    "dbType": "LONGTEXT",
    "hidden": false,
    "mandatory": false,
    "name": "",
    "queried": false,
    "tableName": ""
}