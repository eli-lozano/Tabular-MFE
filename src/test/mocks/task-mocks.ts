import { TASK_STATUS, Task } from "@/types";

const mockLabel = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
Nec dui nunc mattis enim ut tellus elementum.`;

const mockLabel2 = `Nunc mi ipsum faucibus vitae. Enim tortor at auctor urna.
Ac tortor dignissim convallis aenean et tortor at risus.
Vitae semper quis lectus nulla. Enim eu turpis egestas pretium.
Sit amet commodo nulla facilisi nullam vehicula ipsum a.
Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.
Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.`;

const mockLabel3 = `Magna eget est lorem ipsum dolor.`;

const mockLabel4 = `At augue eget arcu dictum. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit.
Massa tincidunt dui ut ornare lectus sit. Id donec ultrices tincidunt arcu non sodales neque.
In cursus turpis massa tincidunt dui ut ornare lectus sit.
Ridiculus mus mauris vitae ultricies leo integer malesuada nunc.
Vitae tortor condimentum lacinia quis vel. Sed lectus vestibulum mattis ullamcorper.
Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.
Lorem mollis aliquam ut porttitor leo a. Vestibulum morbi blandit cursus risus at ultrices mi.
Molestie nunc non blandit massa enim nec. Malesuada fames ac turpis egestas sed tempus urna et.
Accumsan tortor posuere ac ut consequat semper.`;

// Mock Task Data for Client Use
const task1: Task = {
    id: 1,
    label: mockLabel3,
    status: TASK_STATUS.TO_DO,
};

const task2: Task = {
    id: 2,
    label: mockLabel2,
    status: TASK_STATUS.TO_DO,
};

const task3: Task = {
    id: 3,
    label: mockLabel,
    status: TASK_STATUS.TO_DO,
};

const task4: Task = {
    id: 4,
    label: mockLabel3,
    status: TASK_STATUS.TO_DO,
};

const task5: Task = {
    id: 5,
    label: mockLabel4,
    status: TASK_STATUS.TO_DO,
};

const task6: Task = {
    id: 6,
    label: mockLabel3,
    status: TASK_STATUS.TO_DO,
};

const task7: Task = {
    id: 7,
    label: mockLabel2,
    status: TASK_STATUS.TO_DO,
};

const task8: Task = {
    id: 8,
    label: mockLabel4,
    status: TASK_STATUS.TO_DO,
};

export const MockTasks: Task[] = [task1, task2, task3, task4, task5, task6, task7, task8];
