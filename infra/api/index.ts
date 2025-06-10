const api = new sst.aws.ApiGatewayV2("MyApi");

api.route("GET /", {
    handler: "packages/functions/src/index.handler",
    runtime: "nodejs22.x",
    architecture: 'x86_64'
});

export { api };