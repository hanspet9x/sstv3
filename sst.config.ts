/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sstv3",
      removal: "retain",
      protect: false,
      home: "aws",
      providers:{
        aws:{
          profile: "sandboxDev",
          region: "eu-west-1",
        }
      }
    };
  },
  async run() {
    const api = await import('./infra/api');
    const lambda = await import('./infra/lambda');
    $transform(sst.aws.Function, (args, opts, name) => {
      args.runtime = "nodejs22.x"
      args.architecture = 'x86_64'
    })
    return {
      api: api.api.url,
      lambda: lambda.lambda.url
    }
  },
});