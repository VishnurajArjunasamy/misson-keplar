export interface OrderIF{
    firstName: string,
      lastName: string,
      email: string,
      mobile: string,
      date: string,
      time: string,
      preference: {
        veg: boolean,
        nonVeg: boolean,
      },
      category: string,
      restaurant: string,
      totalPersons: number,
  }