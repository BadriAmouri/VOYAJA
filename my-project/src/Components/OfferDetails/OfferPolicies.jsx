const OfferPolicies = ({
  min_num_persons,
  max_num_persons,
  min_age,
  max_age,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-primary rounded-md p-4">
      <h2 className="text-lg font-semibold flex">Offer Policies</h2>
      <div className=" flex items-center bg-red-500">
        <p className="flex items-center w-1/2 gap-4">
          <span class="material-icons text-lg">person_outline</span>
          <span className="text-sm">
            {min_num_persons} - {max_num_persons} persons
          </span>
        </p>
        <div className="flex items-center w-1/2 gap-4">
          <span className="material-icons text-lg">calendar_today</span>
          <span className="text-sm">
            Minimum {min_age} years old, Maximum {max_age} years old
          </span>
        </div>
      </div>
    </div>
  );
};

export default OfferPolicies;
