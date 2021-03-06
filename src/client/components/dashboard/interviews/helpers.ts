export const chooseInterviewData = (that) => {
  const show = that.props.currentSection;
  switch (show) {
    case "this week":
      return that.state.thisWeekInterviews;
    case "future interviews":
      return that.state.futureInterviews;
    case "previous interviews":
      return that.state.previousInterviews;
    default:
      return [];
  }
};

export const prepareInterviewsIntoSections = (that) => {
  if (that.props.interviews && that.props.interviews.length > 0) {
    let pre = [];
    const now = [];
    const next = [];
    const dateNow = Date.now();
    const dateAfterWeek = dateNow + 7 * 24 * 60 * 60 * 1000;

    const sortedInterviews = that.props.interviews.sort((a, b) => {
      return a.time - b.time;
    });

    sortedInterviews.forEach((e) => {
      switch (true) {
        case e.time < dateNow:
          pre.push(e);
          break;
        case e.time > dateAfterWeek:
          next.push(e);
          break;
        default:
          now.push(e);
      }
    });

    pre = pre.sort((a, b) => b.time - a.time);

    that.setState({
      previousInterviews: pre,
      thisWeekInterviews: now,
      futureInterviews: next,
    });
  }
};
