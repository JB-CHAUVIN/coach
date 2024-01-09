const formatItemAsStrapiResult = (item) => {
  return {
    id: item?.id,
    attributes: {
      ...item,
    },
  };
};

module.exports = {
  formatItemAsStrapiResult,
};
