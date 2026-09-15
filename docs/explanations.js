// English and Chinese explanations, in the same order as LESSONS.
const lessonExplanations = {
 vocabulary:{
 N5:[
 ['The early part of the day.','一天开始的时段。'],
 ['To put food in your mouth and eat it.','把食物放进嘴里吃。'],
 ['Someone you enjoy talking to or spending time with.','一起聊天、玩耍或相处的人。'],
 ['Used when food or a drink tastes good.','表示食物或饮料的味道很好。'],
 ['A clear liquid used for drinking and washing.','用于饮用或清洗的透明液体。'],
 ['To look at written words and understand their meaning.','看文字并理解其意思。'],
 ['The day we are living in now.','我们现在正在度过的这一天。'],
 ['Learning and remembering new things.','学习并记住新的知识。']
 ],
 N4:[
 ['Getting the things you need ready before doing something.','为接下来要做的事情准备好所需的东西。'],
 ['An agreement with someone to do something.','与别人约定要做某件事。'],
 ['To find out or check something you do not know.','查找或确认自己不知道的事情。'],
 ['To arrive early enough for a scheduled time or event.','在规定的时间之前到达，赶上某件事。']
 ],
 N3:[
 ['How your mind or body feels at a particular moment.','某一时刻的心情或身体感觉。'],
 ['Thinking of a better or more effective way to do something.','动脑筋想出更好的做法。'],
 ['To keep doing something without stopping.','不停止，继续做同一件事。'],
 ['To check whether something is correct.','检查某件事是否正确或有没有错误。']
 ],
 N2:[
 ['A tendency to develop or move in a particular direction.','向某个方向发展或偏向某种状态的趋势。'],
 ['Understanding an explanation and accepting it as reasonable.','听懂说明，并认为有道理而接受。'],
 ['To add what is needed to make up for something that is missing.','补上不足或缺少的部分。'],
 ['How much you achieve compared with the time or effort you use.','相对于投入的时间或精力，所取得成果的程度。']
 ],
 N1:[
 ['A feeling, impression or sound that remains after an event has ended.','事情结束后仍然留下的感受、印象或回响。'],
 ['Carefully planned or made, even in the smallest details.','连细微之处都考虑周密、制作细致。'],
 ['To develop an ability or quality over a long period of time.','经过长时间积累，培养能力或品质。'],
 ['Clearly visible and easy to notice.','非常明显，容易察觉。']
 ]},
 grammar:{
 N5:[
 ['Introduces a topic and explains what a person or thing is.','提出话题，说明某人或某物是什么。'],
 ['Invites someone to do something together.','邀请对方一起做某件事。'],
 ['Asks someone to do something.','请对方做某件事。']
 ],
 N4:[
 ['Describes something you have experienced at least once before.','表示过去曾经有过某种经历。'],
 ['Describes two actions performed by the same person at the same time.','表示同一个人同时进行两个动作。'],
 ['Expresses an intention or plan for the future.','表示今后做某事的打算或计划。']
 ],
 N3:[
 ['Describes a change in ability or a newly developed habit.','表示能力发生变化，或形成了新的习惯。'],
 ['Denies a particular conclusion or says that something is not entirely true.','否定某种推断，或表示并非完全如此。'],
 ['The speaker feels that little time has passed since an action finished.','表示说话人认为某个动作结束后还没过多久。']
 ],
 N2:[
 ['Expresses a strong belief that something must be true.','表示说话人确信某件事一定如此。'],
 ['Acknowledges one fact, then describes an outcome that was not expected.','承认前面的事实，后面说明与预期不符的情况。'],
 ['Describes a change that happens along with another change.','表示随着一种变化，另一种变化也发生。']
 ],
 N1:[
 ['Expresses certainty that something will cause a particular result or emotion.','表示某件事必定会引起某种结果或情感。'],
 ['Marks the starting point of a series of events that follow.','表示以某件事为开端，接着发生一连串事情。'],
 ['Says that it is unnecessary to go as far as doing something.','表示没有必要做到某种程度，用不着做某事。']
 ]}
};
for (const [category, groups] of Object.entries(lessonExplanations)) {
 for (const [level, translations] of Object.entries(groups)) {
  translations.forEach(([en,zh],i)=>{window.LESSONS[category][level][i][8]=en;window.LESSONS[category][level][i][9]=zh;});
 }
}
