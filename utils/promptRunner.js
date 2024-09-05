import * as allPrompts from '../prompts/index.js';

export async function runPrompts(selection) {
  const results = {};

  async function runPromptsAndServices(promptsToRun, servicesToRun = []) {
    for (const prompt of promptsToRun) {
      if (typeof prompt.prompt === 'function') {
        Object.assign(results, await prompt.prompt());
      } else {
        console.error(`Warning: ${prompt.name} does not have a valid prompt function`);
      }
    }
    for (const service of servicesToRun) {
      const serviceResult = await service.func();
      if (service.name === 'weather' || service.name === 'air') {
        // For weather and air services, flatten the structure
        Object.assign(results, serviceResult);
      } else {
        // For other services, keep the nested structure
        results[service.name] = serviceResult;
      }
    }
  }

  if (typeof selection === 'string') {
    // Run a single prompt or a predefined series
    const selectedPrompt = allPrompts[selection];
    if (!selectedPrompt) {
      throw new Error(`Prompt or series "${selection}" not found`);
    }
    if (Array.isArray(selectedPrompt.prompts)) {
      // It's a series
      await runPromptsAndServices(selectedPrompt.prompts, selectedPrompt.services);
    } else if (typeof selectedPrompt.prompt === 'function') {
      // It's an individual prompt
      Object.assign(results, await selectedPrompt.prompt());
    } else {
      throw new Error(`Invalid prompt structure for "${selection}"`);
    }
  } else if (Array.isArray(selection)) {
    // Run multiple prompts
    const promptsToRun = selection
      .map(promptName => allPrompts[promptName])
      .filter(prompt => prompt && typeof prompt.prompt === 'function');
    await runPromptsAndServices(promptsToRun);
  } else if (selection === undefined) {
    // Run all prompts
    const allPromptsList = Object.values(allPrompts)
      .filter(prompt => prompt && typeof prompt.prompt === 'function');
    await runPromptsAndServices(allPromptsList);
  }

  return results;
}