const initialState = [
  {
    id: 0,
    firstName: "Sandeep",
    lastName: "kumar",
    contactNumber: "123",
  },
];

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateContact = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateContact;
      return state;
    case "DELETE_CONTACT":
      const filterContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};

export default TodoReducer;
