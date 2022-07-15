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
        width: '30px',
        height: '30px',
      },
      md: {
        width: '45px',
        height: '45px',
      },
    },
  };

  return sizeVariant;
};
