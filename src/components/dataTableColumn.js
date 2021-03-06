(() => ({
  name: 'DataTableColumn',
  type: 'DATATABLE_COLUMN',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, useText, getProperty, Property } = B;
    const { TableCell, TableSortLabel } = window.MaterialUI.Core;
    const {
      horizontalAlignment,
      headerText,
      property,
      content,
      sortable,
    } = options;
    const { headerOnly, handleSort, orderBy } = parent || {};
    const propertyId = Array.isArray(property)
      ? property[property.length - 1]
      : property;
    const { name: propertyName, label: propertyLabel } =
      getProperty(propertyId) || {};
    const { field, order = 'asc' } = orderBy || {};
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const contentPlaceholder = isDev && isEmpty ? 'Select property' : '\u00A0';

    const bodyText = useText(content);
    const propContent = isDev ? (
      `{{ ${propertyName} }}`
    ) : (
      <Property id={property} />
    );
    let columnText = propertyName ? propContent : contentPlaceholder;
    if (bodyText) {
      columnText = bodyText;
    }

    const header = useText(headerText);
    let columnHeaderText = propertyLabel || contentPlaceholder;
    if (header) {
      columnHeaderText = header;
    }

    const isSortable = propertyName && sortable;

    const createSortHandler = prop => {
      const sortOrder = order === 'asc' ? 'desc' : 'asc';
      handleSort(prop, sortOrder);
    };

    const Content =
      children.length > 0 ? (
        children
      ) : (
        <span className={classes.content}>{columnText}</span>
      );

    const Header = isSortable ? (
      <TableSortLabel
        classes={{ root: classes.columnSort }}
        active={field === propertyName}
        direction={field === propertyName && order ? order : 'asc'}
        onClick={() => createSortHandler(propertyName)}
      >
        <span className={classes.columnHeader}>{columnHeaderText}</span>
      </TableSortLabel>
    ) : (
      <span className={classes.columnHeader}>{columnHeaderText}</span>
    );

    return isDev ? (
      <div
        className={[
          classes.tableColumn,
          !headerOnly ? classes.tableColumnBody : '',
          !headerOnly ? 'MuiTableCell-root' : '',
        ].join(' ')}
      >
        {headerOnly ? (
          <TableCell align={horizontalAlignment} component="div">
            {Header}
          </TableCell>
        ) : (
          Content
        )}
      </div>
    ) : (
      <TableCell classes={{ root: classes.root }} align={horizontalAlignment}>
        {headerOnly ? Header : Content}
      </TableCell>
    );
  })(),
  styles: B => theme => {
    const { env, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    return {
      tableColumn: {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: ({ options: { width } }) => width || 'auto',
        '& > div': {
          display: 'block',
        },
      },
      tableColumnBody: {
        textAlign: ({ options: { horizontalAlignment } }) => [
          horizontalAlignment,
          '!important',
        ],
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
          '!important',
        ],
      },
      root: {
        display: isDev && ['block', '!important'],
        width: ({ options: { width } }) => width || 'auto',
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
          '!important',
        ],
      },
      columnHeader: {
        color: ({ options: { type } }) => style.getFontColor(type),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        fontWeight: ({ options: { type } }) => style.getFontWeight(type),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        lineHeight: '1.2',
        [`@media ${B.mediaMinWidth(600)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      content: {
        color: ({ options: { bodyType } }) => style.getFontColor(bodyType),
        fontFamily: ({ options: { bodyType } }) =>
          style.getFontFamily(bodyType),
        fontSize: ({ options: { bodyType } }) => style.getFontSize(bodyType),
        fontWeight: ({ options: { bodyType } }) =>
          style.getFontWeight(bodyType),
        textTransform: ({ options: { bodyType } }) =>
          style.getTextTransform(bodyType),
        letterSpacing: ({ options: { bodyType } }) =>
          style.getLetterSpacing(bodyType),
        lineHeight: '1.2',
        [`@media ${B.mediaMinWidth(600)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(960)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Desktop'),
        },
      },
      columnSort: {
        pointerEvents: isDev && 'none',
        '& .MuiSvgIcon-root': {
          opacity: isDev && 0.5,
        },
      },
    };
  },
}))();
