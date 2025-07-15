export const navigatons = [
  {
    name: "Get a quote",
    href: "/services?service=private-moving&service_id=4",
  },
  { name: "Search price lists", href: "/companies" },
  // { name: "Ratings", href: "/ratings" },
];

// services inputs
export const privateMovingInputs = {
  isDivided: true,
  firstPart: {
    title: "Moving out address",
    placeHoleder: "Moving out address placeholder",
  },
  secondPart: {
    title: "Moving address",
  },
  out_address: [
    {
      title: "FRA address",
      name: "FRA_address",
      type: "text",
      placeHoleder: "FRA address placeholder",
    },
    {
      title: "postal code",
      name: "postal_code",
      type: "text",
      placeHoleder: "postal code placeholder",
    },
    {
      title: "from government",
      name: "from_government",
      type: "text",
      placeHoleder: "from government placeholder",
    },
    {
      title: "Address possibly floor",
      name: "Address_possibly_floor",
      type: "text",
    },
    // {
    //   title: "Elevator",
    //   name: "elevator",
    //   type: "radio",
    //   options: [
    //     { title: "Yes", value: "true" },
    //     { title: "No", value: "false" },
    //   ],
    // },
    {
      title: "Number of square meters",
      name: "number_of_square_meters",
      type: "range",
    },
    {
      title: "Furnishing",
      name: "furnishing",
      type: "select",
      options: [
        { title: "fully furnished", value: "fully_furnished" },
        { title: "semi furnished", value: "semi_furnished" },
        { title: "not furnished", value: "not_furnished" },
      ],
    },
    {
      title: "Task description",
      name: "description",
      type: "textarea",
    },
    {
      title: "Parking distance to door",
      type: "select",
      name: "parking_distance_to_door",
      options: [
        { title: "10 meters", value: "10 meters" },
        { title: "20 meters", value: "20 meters" },
        { title: "30 meters", value: "30 meters" },
        { title: "40 meters", value: "40 meters" },
        { title: "more than 50 meters", value: "more than 50 meters" },
      ],
    },
  ],

  moving_address: [
    {
      title: "To address",
      name: "to_address",
      type: "text",
      placeHoleder: "to address placeholder",
    },
    {
      title: "postal code",
      name: "postal_code",
      type: "text",
      placeHoleder: "postal code placeholder",
    },
    {
      title: "to government",
      name: "to_government",
      type: "text",
      placeHoleder: "to government placeholder",
    },

    {
      title: "Address possibly floor",
      name: "Address_possibly_floor",
      type: "text",
    },
    // {
    //   title: "Elevator",
    //   name: "elevator",
    //   type: "radio",
    //   options: [
    //     { title: "Yes", value: "true" },
    //     { title: "No", value: "false" },
    //   ],
    // },
    {
      title: "Service level",
      name: "service_level",
      type: "select",
      options: [
        { title: "Standard", value: "standard" },
        { title: "Premium", value: "premium" },
      ],
    },
    {
      title: "When do you want the task to begin?",
      name: "when_do_want_begin",
      type: "select",
      options: [
        { title: "Within A Week", value: "week" },
        { title: "Later", value: "later" },
      ],
    },

    {
      title: "Parking distance to door",
      type: "select",
      name: "parking_distance_to_door",
      options: [
        { title: "10 meters", value: "10 meters" },
        { title: "20 meters", value: "20 meters" },
        { title: "30 meters", value: "30 meters" },
        { title: "40 meters", value: "40 meters" },
        { title: "more than 50 meters", value: "more than 50 meters" },
      ],
    },
  ],
};

export const storageInputs = {
  isDivided: false,
  firstPart: {
    title: "Storage - Get a quote",
  },
  out_address: [
    {
      title: "How long Should it be stored?",
      name: "storage_time",
      type: "radio",
      options: [
        {
          title: "over 12 montths/indefinite",
          value: "over 12 montths/indefinite",
        },
        { title: "1-12 months", value: "1-12 months" },
        { title: "under a month", value: "under a month" },
      ],
    },
    {
      title: "Storage desired in",
      name: "storage_desired_in",
      type: "select",
      options: [
        { title: "Copenhagen County", value: "Copenhagen County" },
        { title: "Frederiksborg County", value: "Frederiksborg County" },
        { title: "Roskild County", value: "Roskild County" },
        { title: "West Zealaland County", value: "West Zealaland County" },
        { title: "Storstrom County", value: "Storstrom County" },
        { title: "County of Funen", value: "County of Funen" },
        { title: "South Jutland County", value: "South Jutland County" },
        { title: "Vejle County", value: "Vejle County" },
        { title: "Ribe County", value: "Ribe County" },
        { title: "Ringkobing County", value: "Ringkobing County" },
        { title: "Aarhus County", value: "Aarhus County" },
        { title: "Viborg County", value: "Viborg County" },
        { title: "North Jutland County", value: "North Jutland County" },
        { title: "Bornholm County", value: "Bornholm County" },
      ],
    },
    {
      title: "Area approx",
      name: "area_approx",
      type: "text",
    },
    {
      title: "When do you want the task to begin?",
      name: "when_do_want_begin",
      type: "select",
      options: [
        { title: "Within A Week", value: "week" },
        { title: "Later", value: "later" },
      ],
    },

    {
      title: "Task description",
      name: "description",
      type: "textarea",
    },
    {
      title: "With transport",
      name: "with_transport",
      type: "radio",
      options: [
        { title: "Yes", value: "yes" },
        { title: "No", value: "no" },
      ],
    },
  ],
};

export const movingFurnitureInputs = {
  isDivided: false,
  firstPart: {
    title: "Moving individual furniture/white goods - Get a quote",
  },
  out_address: [
    {
      title: "FRA address",
      name: "FRA_address",
      type: "text",
      placeHoleder: "FRA address placeholder",
    },
    {
      title: "postal code",
      name: "postal_code",
      type: "text",
      placeHoleder: "postal code placeholder",
    },
    {
      title: "from government",
      name: "from",
      type: "text",
      placeHoleder: "to government placeholder",
    },
    {
      title: "TO address",
      name: "to_address",
      type: "text",
      placeHoleder: "to address placeholder",
    },
    {
      title: "to government",
      name: "to_government",
      type: "text",
      placeHoleder: "to government placeholder",
    },

    {
      title: "What needs to be moved?",
      name: "what_needs_to_be_moved",
      type: "select",
      options: [
        { title: "Furniture", value: "furniture" },
        { title: "Piano", value: "piano" },
        { title: "Vehicle", value: "vehicle" },
        { title: "Boat", value: "boat" },
        { title: "Animal", value: "animal" },
        { title: "Other", value: "other" },
      ],
    },
    {
      title: "The topic is moved OFF",
      name: "the_topic_is_moved_OFF",
      type: "select",
      options: [
        { title: "Street plan", value: "1364" },
        { title: "House/Floor Plan/Storage", value: "1365" },
        { title: "1st floor", value: "1366" },
        { title: "2nd floor", value: "1367" },
        { title: "3rd floor", value: "1368" },
        { title: "4th floor", value: "1369" },
        { title: "5th floor or above", value: "1370" },
      ],
    },

    // {
    //   title: "The topic is moved TO",
    //   name: "the_topic_is_moved_TO",
    //   type: "text",
    // },

    {
      title: "Service level",
      name: "service_level",
      type: "select",
      options: [
        { title: "I help myself with reading", value: "i_help_myself" },
        {
          title: "There is an elevator at the departure address",
          value: "there_is_an_elevator",
        },
        {
          title: "There is an elevator at the move-in address",
          value: "there_is_an_elevator_2",
        },
      ],
    },
    {
      title: "When do you want the task to begin?",
      name: "when_do_want_begin",
      type: "select",
      options: [
        { title: "Within A Week", value: "week" },
        { title: "Later", value: "later" },
      ],
    },
    {
      title: "Task description",
      name: "description",
      type: "textarea",
    },
  ],
};

export const companyRelocationInputs = {
  isDivided: true,
  firstPart: {
    title: "Moving out address",
    placeHoleder: "Moving out address placeholder",
  },
  secondPart: {
    title: "Moving address",
  },
  out_address: [
    {
      title: "FRA address",
      name: "FRA_address",
      type: "text",
      placeHoleder: "FRA address placeholder",
    },
    {
      title: "postal code",
      name: "postal_code",
      type: "text",
      placeHoleder: "postal code placeholder",
    },
    {
      title: "from government",
      name: "from_government",
      type: "text",
      placeHoleder: "from government placeholder",
    },

    // {
    //   title: "from city",
    //   name: "from_city",
    //   type: "text",
    //   placeHoleder: "from city placeholder",
    // },
    {
      title: "Address possibly floor",
      name: "Address_possibly_floor",
      type: "text",
    },
    {
      title: "Elevator",
      name: "elevator",
      type: "radio",
      options: [
        { title: "Yes", value: "true" },
        { title: "No", value: "false" },
      ],
    },
    {
      title: "Number of square meters",
      name: "number_of_square_meters",
      type: "range",
    },
    {
      title: "Furnishing",
      name: "furnishing",
      type: "select",
      options: [
        { title: "fully furnished", value: "fully_furnished" },
        { title: "semi furnished", value: "semi_furnished" },
        { title: "not furnished", value: "not_furnished" },
      ],
    },
    {
      title: "Task description",
      name: "description",
      type: "textarea",
    },
    {
      title: "machines",
      name: "machines",
      type: "text",
      placeHoleder: "machines placeholder",
    },
  ],

  moving_address: [
    {
      title: "To address",
      name: "to_address",
      type: "text",
      placeHoleder: "to address placeholder",
    },
    {
      title: "postal code",
      name: "postal_code",
      type: "text",
      placeHoleder: "postal code placeholder",
    },
    {
      title: "to government",
      name: "to_government",
      type: "text",
      placeHoleder: "to government placeholder",
    },

    // {
    //   title: "to city",
    //   name: "to_city",
    //   type: "text",
    //   placeHoleder: "from city placeholder",
    // },
    // {
    //   title: "Address possibly floor",
    //   name: "Address_possibly_floor",
    //   type: "text",
    // },
    // {
    //   title: "Elevator",
    //   name: "elevator",
    //   type: "radio",
    //   options: [
    //     { title: "Yes", value: "true" },
    //     { title: "No", value: "false" },
    //   ],
    // },
    {
      title: "Number of square meters",
      name: "number_of_square_meters",
      type: "range",
    },
    {
      title: "Service level",
      name: "service_level",
      type: "select",
      options: [
        { title: "Standard", value: "standard" },
        { title: "Premium", value: "premium" },
      ],
    },
    {
      title: "When do you want the task to begin?",
      name: "when_do_want_begin",
      type: "select",
      options: [
        { title: "Within A Week", value: "week" },
        { title: "Later", value: "later" },
      ],
    },
  ],
};