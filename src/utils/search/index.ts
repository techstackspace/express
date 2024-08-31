export const createSearchQuery = (
  searchTerm: string,
  modelFields: { [model: string]: string[] }
): any => {
  if (!searchTerm) {
    return {};
  }

  const searchQueries = Object.keys(modelFields).map((model) => {
    const fields = modelFields[model];
    return {
      model,
      $or: fields.map((field) => ({
        [field]: { $regex: new RegExp(searchTerm, 'i') },
      })),
    };
  });

  return { $or: searchQueries };
};
