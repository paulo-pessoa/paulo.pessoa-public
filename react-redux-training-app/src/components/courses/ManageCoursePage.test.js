import React from "react";
import { mount, shallow } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";
import { act } from 'react-dom/test-utils';


function renderMount(args) {
    const defaultProps = {
        authors,
        courses,
        // Passed from React Router in real app, so just stubbing in for test.
        // Could also choose to use MemoryRouter as shown in Header.test.js,
        // or even wrap with React Router, depending on whether I
        // need to test React Router related behavior.
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };

    const props = { ...defaultProps, ...args };

    return mount(<ManageCoursePage {...props} />);
}

function renderShallow(args) {
    const defaultProps = {
        authors,
        courses,
        // Passed from React Router in real app, so just stubbing in for test.
        // Could also choose to use MemoryRouter as shown in Header.test.js,
        // or even wrap with React Router, depending on whether I
        // need to test React Router related behavior.
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };

    const props = { ...defaultProps, ...args };

    return shallow(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field using mount", () => {
    const wrapper = renderMount();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
});

it("invokes saveCourse when correct information is provided", () => {
    const wrapper = renderMount();
    const titleInput = wrapper.find('input').get(0);
    // const titleInput = wrapper.findByProps({name: "title"});
    console.log(titleInput.props);
    // titleInput.props.value = "Title";

    titleInput.props.onChange(({ target: { value: 'Title' } }));
    jest.runAllTimers();
    // titleInput.props.simulate('change', { target: { value: 'Title' } });
    expect(titleInput.props.value).toBe('Title');

    // title.value = 'Title';
    // const authorId = wrapper.find('input').get(1);
    // authorId.value = 'Author Id';
    // const category = wrapper.find('input').get(2);
    // category.value = 'Category';
    //
    // wrapper.find("form").simulate("submit");
    // const error = wrapper.find(".alert").first();
    // expect(error.text()).not.toBe("Title is required.");
});

it("sets error when attempting to save an empty title field using shallow", () => {
    const wrapper = renderShallow();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
});
