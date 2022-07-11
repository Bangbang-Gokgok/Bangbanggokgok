export const getKindVariant = () => {
  const kindVariant = {
    prop: 'kind',
    variants: {
      circle: {
        borderRadius: '50%',
      },
      square: {
        borderRadius: '5px',
      },
    },
  };

  return kindVariant;
};

export const getSizeVariant = () => {
  const sizeVariant = {
    prop: 'size',
    variants: {
      sm: {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        minHeight: '24px',
      },
      md: {
        width: '32px',
        height: '32px',
        minWidth: '32px',
        minHeight: '32px',
      },
      lg: {
        width: '40px',
        height: '40px',
        minWidth: '40px',
        minHeight: '40px',
      },
      xxl: {
        width: '100px',
        height: '100px',
        minWidth: '100px',
        minHeight: '100px',
      },
    },
  };

  return sizeVariant;
};
