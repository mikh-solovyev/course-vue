import card from "./card.vue";
import { mount } from "@vue/test-utils";

it("component render", async () => {
    const wrapper = mount(card);
    const component = await wrapper.find(".card-component");

    expect(component.exists()).toBe(true);
});

it("component simple slot", async () => {
    const wrapper = mount(card, {
        slots: {
            default: "Content slot"
        }
    });

    await wrapper.setProps({
        simple: true
    });

    expect(wrapper.text()).toEqual("Content slot");
});

it("snapshots", async () => {
    const wrapper = mount(card);

    expect(wrapper.element).toMatchSnapshot();
});
