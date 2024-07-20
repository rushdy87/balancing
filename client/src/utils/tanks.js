export const groupedTanksByProductName = (tanks) => {
  // Reduce tanks to the desired format
  const groupedTanks = tanks.reduce((acc, tank) => {
    // Check if the product already exists in the accumulator
    const productGroup = acc.find((group) => group.product === tank.product);

    if (productGroup) {
      // If product group exists, add the tag_number to the tanks array
      productGroup.tanks.push(tank);
    } else {
      // If product group does not exist, create a new group
      acc.push({
        product: tank.product,
        tanks: [tank],
      });
    }

    return acc;
  }, []);

  return groupedTanks;
};

export const prepareTanksObject = (tanks) => {
  return tanks.reduce((acc, tank) => {
    acc[tank.tag_number] = tank.volume;
    return acc;
  }, {});
};
