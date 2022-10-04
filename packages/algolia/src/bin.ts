import { parseArgs } from 'node:util';
import { AlgoliaRecordSource, indexToAlgolia } from '.';

const options = {
  config: {
    type: 'string',
    short: 'c',
  },
  docsBaseDir: {
    type: 'string',
  },
  output: {
    type: 'string',
    short: 'o',
  },
  dryrun: {
    type: 'boolean',
    short: 'd',
  },
  source: {
    type: 'string',
  },
  domain: {
    type: 'string',
  },
} as const;
const { values } = parseArgs({ options });

console.log(values);

indexToAlgolia({
  domain: values.domain || process.env.SITE_URL!,
  lockfilePath: values.output!,
  source: values.source as unknown as AlgoliaRecordSource,
  nextra: {
    docsBaseDir: values.docsBaseDir!,
  },
  dryMode: values.dryrun,
});
