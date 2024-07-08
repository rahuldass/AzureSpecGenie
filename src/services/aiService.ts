import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

export default class AiService {
  async generateUseCase(requirementData: string) {
    const requirement = this.stripHtmlTags(requirementData)
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `
          Context: I am developing a new product and have a set of requirements. 
          I need to generate detailed test cases for these requirements to assist 
          testers in their work. The test cases should cover both positive and negative 
          scenarios, complete with relevant test data. The final output should be 
          formatted in Markdown for easy rendering.
          Target Audience: Testers
          Requirements: ${requirement}
          Instructions:
          Use Case Title: Clearly state the title of the test case.
          Description: Provide a brief description of the test case.
          Actors: Identify the primary and secondary actors involved in the test case.
          Preconditions: Specify any conditions that must be met before the test case can be executed.
          Postconditions: Describe the state of the system after the test case has been executed.
          Main Flow:
          Step-by-Step Process: Detail each step in the process for the positive scenario write in points.
          Expected Result: Describe the expected outcome for each step.
          Alternate Flow:
          Step-by-Step Process: Detail each step in the process for negative scenarios write in points.
          Expected Result: Describe the expected outcome for each step.
          Test Data: Provide specific data to be used in both positive and negative scenarios.
          `,
        },
      ],
      model: 'llama3-8b-8192',
      stream: true,
    })
    for await (const chunk of response) {
      //console.log(chunk.choices[0]?.delta?.content || '')
      return chunk.choices[0]?.delta?.content || ''
    }
    //return response.choices[0]?.message?.content || ''
  }

  stripHtmlTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, '')
  }
}
