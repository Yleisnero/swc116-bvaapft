# Characterize the SC weakness assigned to you.

- [ ] Describe the various forms it may take and construct minimal sample contracts for each variant. Also describe variants that look similar but are not a weakness, and construct minimal contracts for these non-weaknesses.
- [ ] Describe the consequences if the weakness is exploited.
- [ ] Collect vulnerable contracts used by the papers to motivate/illustrate the weakness.
- [ ] Summarize the code properties that tools are looking for so that they can detect the weakness.
- [ ] Sketch ways to potentially exploit the different variants of the weakness.

As reading material, we suggest the entries in the SWC and OpenSCV registry, the linked tool papers and the publications listed with your weakness (if there is any).
You may also find useful information in the more general papers listed as "further reading".

Everyone should upload a paper on Tuwel, even when you work in a group (can be the same document, though). If several people contribute to the paper, list them as authors. Clearly, you should be among the authors of the paper that you upload.

For information on how to format the paper, see these notes; the source files of this PDF are in seminar.zip.

# Aim for the seminar
- For the assigned weakness:
    - research its various definitions
    - systematize the definitions, make them precise
    - describe the code properties checked by tools

- For each definition and code property:
    - hand-craft tiny sample contracts with and without the weakness,
    - classify real-world contracts provided by us.

- For each contract with a weakness, give a scripted exploit:
    - deploy the victim and maybe attackers
    - execute transactions
    - specify an assertion that holds if and only if the exploit was successful

- For each contract without the weakness:
    - argue convincingly, why there is none.