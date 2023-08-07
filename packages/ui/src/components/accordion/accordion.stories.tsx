import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from ".";

export default {
  title: "Bits/Buttons/Accordion",
  tags: ["autodocs"],
  decorators: [],
};

export const ButtonOne = {
  render: () => {
    return (
      <div className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
  args: {},
};
