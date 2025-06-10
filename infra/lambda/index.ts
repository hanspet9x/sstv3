export const lambda = new sst.aws.Function("MyLambda", {
    url: true,
  handler: "packages/functions/src/index.handler",
  runtime: 'nodejs22.x',
  architecture: 'x86_64'
});