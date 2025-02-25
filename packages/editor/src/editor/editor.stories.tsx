import { Meta, StoryObj } from '@storybook/react';
import { SchemaDiffEditor } from './schema-diff-editor';
import { SchemaEditor, SchemaEditorProps } from './schema-editor';
import { debugHoverSource, showWidgetInPosition } from './utils';

const TEST_SCHEMA = `type Query {
  ping: Boolean
  me: User!
}

" represents a valid email "
scalar Email

""" Represents a simple user """
type User {
  id: ID!
  email: Email!
  profile: Profile!
}

type Profile {
  name: String
  age: Int
}
`;

export default {
  title: 'MonacoEditor',
  component: SchemaEditor,
} satisfies Meta<typeof SchemaEditor>;

type Story = StoryObj<SchemaEditorProps>;

export const BasicSchemaEditor: Story = {
  args: {
    height: '100vh',
    schema: TEST_SCHEMA,
    hoverProviders: [debugHoverSource],
    onChange(value, event) {
      console.log('onChange', { value, event });
    },
    onMount(editor, monaco) {
      console.log('onMount', { editor, monaco });
    },
    beforeMount(monaco) {
      console.log('beforeMount', { monaco });
    },
    onBlur(value) {
      console.log('onBlur', { value });
    },
    onLanguageServiceReady(languageService) {
      console.log('onLanguageServiceReady', { languageService });
    },
    onSchemaChange(schema, sdl) {
      console.log('onSchemaChange', { schema, sdl });
    },
    onSchemaError(errors, sdl) {
      console.log('onSchemaError', { errors, sdl });
    },
    actions: [
      {
        id: 'dotan.test.click',
        label: 'My Custom Aaction',
        onRun({ editor, bridge }) {
          if (['NamedType', 'ObjectTypeDef'].includes(bridge.token.state.kind as string)) {
            const domNode = document.createElement('div');
            domNode.innerHTML = `You Selected: <strong>${bridge.token.state.kind} / ${bridge.token.state.name}</strong><br />You can show here any html that you wish!`;
            domNode.style.background = 'orange';
            showWidgetInPosition(editor as any, bridge.position, domNode);
          }
        },
      },
    ],
  },
};

export function BasicSchemaDiffEditor() {
  return (
    <SchemaDiffEditor original={TEST_SCHEMA} modified={`${TEST_SCHEMA}\ntype Test { id: ID! }`} />
  );
}
