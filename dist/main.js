"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
async function run() {
    const { LARK_WEBHOOK, LARK_SECRET } = process.env;
    const header_template = core.getInput('header_template');
    const header_content = core.getInput('header_content');
    const env_tag = core.getInput('message_env_tag');
    const version = core.getInput('message_version');
    const commit_logs = core.getInput('message_commit_logs');
    const card_elements = [
        {
            tag: "div",
            text: {
                content: `**仓库** [${process.env.GITHUB_REPOSITORY}](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY})`,
                tag: "lark_md"
            }
        },
        {
            tag: "div",
            text: {
                content: `**环境** ${env_tag}`,
                tag: "lark_md"
            }
        },
        {
            tag: "div",
            text: {
                content: `**版本** ${version}`,
                tag: "lark_md"
            }
        },
        {
            tag: "div",
            text: {
                content: `**作者** ${process.env.GITHUB_ACTOR}`,
                tag: "lark_md"
            }
        },
        {
            tag: "div",
            text: {
                content: `**URL** [${process.env.GITHUB_RUN_ID}](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})`,
                tag: "lark_md"
            }
        },
        {
            tag: "div",
            text: {
                content: `**修改记录**\n ${commit_logs}`,
                tag: "lark_md"
            }
        }
    ];
    await fetch(LARK_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg_type: 'interactive',
            card: {
                header: {
                    template: header_template,
                    title: {
                        content: header_content,
                        tag: 'plain_text'
                    }
                },
                elements: card_elements
            }
        })
    }).then(async (response) => {
        if (!response.ok) {
            core.setFailed(`HTTP error! Status: ${response.status}. Message: ${await response.text()}`);
        }
        core.setOutput('message', 'notify lark success!');
        return response.json();
    });
}
