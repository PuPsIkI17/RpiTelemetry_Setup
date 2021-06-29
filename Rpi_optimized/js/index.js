"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iot_device_sdk_v2_1 = require("aws-iot-device-sdk-v2");
const util_1 = require("util");
const yargs = require('yargs');
yargs.command('*', false, (yargs) => {
    yargs
        .option('endpoint', {
        alias: 'e',
        description: "Your AWS IoT custom endpoint, not including a port. " +
            "Ex: \"abcd123456wxyz-ats.iot.us-east-1.amazonaws.com\"",
        type: 'string',
        required: true
    })
        .option('ca_file', {
        alias: 'r',
        description: 'FILE: path to a Root CA certficate file in PEM format.',
        type: 'string',
        required: false
    })
        .option('cert', {
        alias: 'c',
        description: 'FILE: path to a PEM encoded certificate to use with mTLS',
        type: 'string',
        required: false
    })
        .option('key', {
        alias: 'k',
        description: 'FILE: Path to a PEM encoded private key that matches cert.',
        type: 'string',
        required: false
    })
        .option('client_id', {
        alias: 'C',
        description: 'Client ID for MQTT connection.',
        type: 'string',
        required: false
    })
        .option('topic', {
        alias: 't',
        description: 'STRING: Targeted topic',
        type: 'string',
        default: 'test/topic'
    })
        .option('count', {
        alias: 'n',
        default: 10,
        description: 'Number of messages to publish/receive before exiting. ' +
            'Specify 0 to run forever.',
        type: 'number',
        required: false
    })
        .option('use_websocket', {
        alias: 'W',
        default: false,
        description: 'To use a websocket instead of raw mqtt. If you ' +
            'specify this option you must specify a region for signing, you can also enable proxy mode.',
        type: 'boolean',
        required: false
    })
        .option('signing_region', {
        alias: 's',
        default: 'us-east-1',
        description: 'If you specify --use_websocket, this ' +
            'is the region that will be used for computing the Sigv4 signature',
        type: 'string',
        required: false
    })
        .option('proxy_host', {
        alias: 'H',
        description: 'Hostname for proxy to connect to. Note: if you use this feature, ' +
            'you will likely need to set --ca_file to the ca for your proxy.',
        type: 'string',
        required: false
    })
        .option('proxy_port', {
        alias: 'P',
        default: 8080,
        description: 'Port for proxy to connect to.',
        type: 'number',
        required: false
    })
        .option('message', {
        alias: 'M',
        description: 'Message to publish.',
        type: 'string',
        default: 'Hello world!'
    })
        .option('messageType', {
        alias: 'T1',
        description: 'messageType',
        type: 'string',
        default: 'ok'
    })
        .option('bandwith', {
        alias: 'T2',
        description: 'bandwith',
        type: 'number',
        default: 80
    })
        .option('memory_size', {
        alias: 'T3',
        description: 'memory_size',
        type: 'number',
        default: 1013
    })
        .option('memory_leaks', {
        alias: 'T4',
        description: 'memory_leaks',
        type: 'number',
        default: 80
    })
        .option('cpu_temperature', {
        alias: 'T5',
        description: 'cpu_temperature',
        type: 'number',
        default: 80
    })
        .option('cpu_usage', {
        alias: 'T5',
        description: 'cpu_usage',
        type: 'number',
        default: 30
    })
        .option('verbosity', {
        alias: 'v',
        description: 'BOOLEAN: Verbose output',
        type: 'string',
        default: 'none',
        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'none']
    })
        .help()
        .alias('help', 'h')
        .showHelpOnFail(false);
}, main).parse();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function execute_session(connection, argv, device_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const decoder = new util_1.TextDecoder('utf8');
                const on_publish = (topic, payload, dup, qos, retain) => __awaiter(this, void 0, void 0, function* () {
                    const json = decoder.decode(payload);
                    console.log(json);
                    const message = JSON.parse(json);
                    const mid = message.messageId;
                    console.log(`Message "${mid}" was published.`);
                    if (message.sequence == argv.count) {
                        resolve();
                    }
                });
                for (let op_idx = 0;; ++op_idx) {
                    const exec = require("child_process").execSync;
                    const result = exec("python python/jsonData.py");
                    const device_data = result.toString("utf8").split(/\r?\n/);
                    const cpu_freq = parseFloat(device_data[0]);
                    const cpu_usage = parseFloat(device_data[1]);
                    const memory_size = parseFloat(device_data[2]);
                    const memory_usage = parseFloat(device_data[3]);
                    const disk_size = parseFloat(device_data[4]);
                    const disk_usage = parseFloat(device_data[5]);
                    const network_last = parseFloat(device_data[6]);
                    const network_total = parseFloat(device_data[6]);
                    const publish = () => __awaiter(this, void 0, void 0, function* () {
                        const cpu = {
                            freq: cpu_freq,
                            usage: cpu_usage
                        };
                        const memory = {
                            size: memory_size,
                            usage: memory_usage
                        };
                        const disk = {
                            size: disk_size,
                            usage: disk_usage
                        };
                        const network = {
                            last: network_last,
                            total: network_total
                        };
                        const msg = {
                            device_id: device_id,
                            messageId: op_idx + 1,
                            messageType: argv.messageType,
                            cpu: cpu,
                            memory: memory,
                            disk: disk,
                            network: network
                        };
                        const json = JSON.stringify(msg);
                        connection.publish(argv.topic, json, aws_iot_device_sdk_v2_1.mqtt.QoS.AtLeastOnce);
                    });
                    yield connection.subscribe(argv.topic, aws_iot_device_sdk_v2_1.mqtt.QoS.AtLeastOnce, on_publish);
                    publish();
                    yield sleep(10000);
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
function main(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const exec = require("child_process").execSync;
        const result = exec("python python/MAC.py");
        const device_data = result.toString("utf8").split(/\r?\n/);
        const device_id = device_data[0];
        if (argv.verbosity != 'none') {
            const level = parseInt(aws_iot_device_sdk_v2_1.io.LogLevel[argv.verbosity.toUpperCase()]);
            aws_iot_device_sdk_v2_1.io.enable_logging(level);
        }
        const client_bootstrap = new aws_iot_device_sdk_v2_1.io.ClientBootstrap();
        let config_builder = aws_iot_device_sdk_v2_1.iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(argv.cert, argv.key);
        config_builder.with_certificate_authority_from_path(undefined, argv.ca_file);
        config_builder.with_clean_session(false);
        config_builder.with_client_id(argv.client_id || "id-" + Math.floor(Math.random() * 100000000));
        config_builder.with_endpoint(argv.endpoint);
        const timer = setTimeout(() => { }, 60 * 1000);
        const config = config_builder.build();
        const client = new aws_iot_device_sdk_v2_1.mqtt.MqttClient(client_bootstrap);
        const connection = client.new_connection(config);
        yield connection.connect();
        yield execute_session(connection, argv, device_id);
        yield connection.disconnect();
        // Allow node to die if the promise above resolved
        clearTimeout(timer);
    });
}
//# sourceMappingURL=index.js.map