sap.ui.define(() => {
    "use strict";
    return {
            name: "QUnit test suite for UI5 testinvent",
            defaults: {
                page: "ui5://test-resources/ui5/testinvent/Test.qunit.html?testsuite={suite}&test={name}",
                qunit: {
                    version: 2
                },
                ui5: {
                    theme: "sap_horizon"
                },
                loader: {
                    paths: {
                        "ui5/testinvent": "../"
                    }
                }
            },
            tests: {
                "unit/unitTests": {
                title: "UI5 testinvent - Unit Tests"
            },
                "integration/opaTests": {
                        title: "UI5 testinvent - Integration Tests"
                }
            }
    };
});