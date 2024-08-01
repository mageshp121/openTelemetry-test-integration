// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
// const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// const sdk = new NodeSDK({
//   traceExporter: new OTLPTraceExporter({
//     url: 'http://localhost:4318/v1/traces', // Adjust this if necessary
//   }),
//   metricExporter: new PrometheusExporter({
//     startServer: true, // Start a Prometheus server for metrics
//   }),
//   instrumentations: [
//     new ExpressInstrumentation()
//   ]
// });

// sdk.start()



const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');


const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'started-test-traser',
});


const provider = new NodeTracerProvider({
  resource: resource,
});

provider.register();


provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ZipkinExporter({
      url: 'http://localhost:9411/api/v2/spans', 
    })
  )
);

// Initialize OpenTelemetry APIs
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('started-test-traser');

// Example usage
const span = tracer.startSpan('example-traced-data');
// Performing operations
span.end();

console.log('Tracing initialized');



