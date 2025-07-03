import SuggestionCard from './SuggestionCard';

const suggestions = [
  {
    _id: '1',
    name: 'Aryan Jain',
    headline: 'Technical Head at Olympism | B.Tech CSE ...',
    profileImageUrl: '/default-profile.svg',
  },
  {
    _id: '2',
    name: 'Harshal Patil',
    headline: 'Python | Java | C++ | JavaScript | SQL ...',
    profileImageUrl: '/default-profile.svg',
  },
];

function PeopleYouMayKnowSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-base">
          People you may know from Artificial Intelligence, Machine Learning, Data Science, Agentic, Generative AI, Scientist & Analyst
        </h2>
        <button className="text-sm text-blue-500 hover:underline">Show all</button>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {suggestions.map((sug) => (
          <SuggestionCard key={sug._id} data={sug} />
        ))}
      </div>
    </div>
  );
}

export default PeopleYouMayKnowSection;
