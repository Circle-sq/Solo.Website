const { identifier } = require('@babel/types');
const { builders } = require('ast-types');

const template = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => {
    const newComponentName = `${componentName.replace('Svg', '')}Icon`;
    const camelCaseNewComponentName = newComponentName.charAt(0).toLowerCase() + newComponentName.slice(1);

    const roleAttribute = builders.jsxAttribute(builders.jsxIdentifier('role'), builders.stringLiteral('img'));
    const ariaLabelAttribute = builders.jsxAttribute(
        builders.jsxIdentifier('aria-label'),
        builders.stringLiteral(camelCaseNewComponentName),
    );
    const dataTestIdAttribute = builders.jsxAttribute(
        builders.jsxIdentifier('data-testid'),
        builders.stringLiteral(camelCaseNewComponentName),
    );

    exports[0].declaration.name = newComponentName;
    jsx.openingElement.name.name = 'SvgIcon';
    jsx.closingElement.name.name = 'SvgIcon';
    jsx.openingElement.attributes.push(
        roleAttribute,
        ariaLabelAttribute,
        dataTestIdAttribute,
        builders.jsxSpreadAttribute(identifier('props')),
    );

    return tpl`
        ${imports};
        ${'\n'}
        import { SvgIcon } from './helpers/SvgIcon.styled';
        ${'\n'}
        ${interfaces};
        const ${newComponentName} = (${props}: SVGProps<SVGSVGElement>) => (
            ${jsx}
        );
        ${'\n'}
        ${exports};
    `;
};

module.exports = template;
