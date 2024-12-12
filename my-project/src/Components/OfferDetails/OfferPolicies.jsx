const OfferPolicies = ({
  min_num_persons,
  max_num_persons,
  min_age,
  max_age,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-primary rounded-md p-4">
      <h2 className="text-lg font-medium">Offer Policies</h2>
      <div className=" flex items-end">
        <p className="flex items-center w-1/2 gap-4">
          <span class="material-icons text-lg">person_outline</span>
          <p className="text-sm">
            {min_num_persons} - {max_num_persons} persons
          </p>
        </p>
        <p className="flex items-center w-1/2 gap-4">
          <span class="material-icons text-lg">calendar_today</span>
          <p className="text-sm">
            Minimum {min_age} years old, Maximum {max_age} years old
          </p>
        </p>
      </div>
    </div>
  );
};

export default OfferPolicies;
