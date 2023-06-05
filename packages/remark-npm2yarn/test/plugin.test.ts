import { compileMdx } from 'nextra/compile';
import { remarkNpm2Yarn } from '../src';

describe('remark-npm2yarn', () => {
  it('should work', async () => {
    const mdx = await compileMdx(
      `
\`\`\`sh npm2yarn filename="Terminal"
npm i -D @graphql-eslint/eslint-plugin
\`\`\`
    `,
      {
        mdxOptions: {
          remarkPlugins: [remarkNpm2Yarn],
        },
      },
    );
    expect(mdx.result).toMatchInlineSnapshot(`
      "/*@jsxRuntime automatic @jsxImportSource react*/
      const {jsx: _jsx, jsxs: _jsxs} = arguments[0];
      const {useMDXComponents: _provideComponents} = arguments[0];
      function _createMdxContent(props) {
        const _components = Object.assign({
          pre: \\"pre\\",
          code: \\"code\\",
          span: \\"span\\"
        }, _provideComponents(), props.components);
        return _jsx(_components.pre, {
          \\"data-language\\": \\"sh\\",
          \\"data-theme\\": \\"default\\",
          filename: \\"Terminal\\",
          children: _jsx(_components.code, {
            \\"data-language\\": \\"sh\\",
            \\"data-theme\\": \\"default\\",
            children: _jsxs(_components.span, {
              className: \\"line\\",
              children: [_jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-token-function)\\"
                },
                children: \\"npm\\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-color-text)\\"
                },
                children: \\" \\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-token-string)\\"
                },
                children: \\"i\\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-color-text)\\"
                },
                children: \\" \\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-token-string)\\"
                },
                children: \\"-D\\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-color-text)\\"
                },
                children: \\" \\"
              }), _jsx(_components.span, {
                style: {
                  color: \\"var(--shiki-token-string)\\"
                },
                children: \\"@graphql-eslint/eslint-plugin\\"
              })]
            })
          })
        });
      }
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, props)
        })) : _createMdxContent(props);
      }
      return {
        default: MDXContent
      };
      "
    `);
  });
});
