let list = [
  ['No one has ever become poor by giving', 'AnneFrank'],
  ["Everything has beauty but not everyone sees it", "Confucius"],
  ["The mind is a wonderful servant but a terrible master", "Robin Sharma"],
  ["Nothing will work unless you do", "Maya Angelou"],
  ["Do not raise your voice Improve your argument", "Desmond Tutu"],
  ["Our lives are like a candle in the wind","Carl Sandburg"],
  ["Be a voice not an echo","Unknown"],
  ["The only way to have a friend is to be one","Ralph Waldo Emerson"],
  ["A friend is one who knows us but loves us anyway","Jerome Cummings"],
  ["Fate chooses our relatives We choose our friends","Jacques Delille"],
  ["A faithful friend is the medicine of life","Ecclesiasticus 6:16"],
  ["Impossible is for the unwilling","John Keats"],
  ["No pressure no diamonds","Thomas Carlyle"],
  ["My life is my message","Mahatma Gandhi"],
  ["My life is my argument","Albert Schweitzer"],
  ["Broken crayons still color","Unknown"],
  ["Whatever you are be a good one","Abraham Lincoln"],
  ["If it matters to you You will find a way","Charlie Gilkey"],
  ["Whatever you do Do with all your might","Marcus Tullius Cicero"],
  ["If you are going through hell, keep going","Winston Churchill"],
  ["We are twice armed if we fight with faith","Plato"],
  ["The wisest mind has something yet to learn","George Santanaya"],
  ["Persistence guarantees that results are inevitable","Paramahansa Yogananda"],
  ["In life you need either inspiration or desperation","Tony Robbins"],
  ["I would rather die on my feet than live on my knees","Euripides"],
  ["It does not matter how slowly you go as long as you do not stop","Confucius"],
  ["It is better to live one day as a lion, than a thousand days as a lamb","Roman proverb"],
  ["The two most important days in your life are the day you are born and they day you find out why","Mark Twain"],
  ["Each day provides its own gifts","Marcus Aurelius"],
  ["Nothing is worth more than this day","Johann Wolfgang von Goethe"],
  ["Believe you can and you are halfway there","Theodore Roosevelt"],
  ["You make mistakes Mistakes don’t make you","Unknown"],
  ["Do not go through life, grow through life","Eric Butterworth"],
]

const print = ()=> {
  let l = list.map(quo=> {
    return {
      quote:quo[0],
      author:quo[1],
      length: quo[0].length
    }
  });
  console.log(JSON.stringify(l));
}

export default print;