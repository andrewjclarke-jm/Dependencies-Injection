import { createIoCContainer } from "./ioc";
import type { User } from "./types";

const IoCContainer = createIoCContainer();

const renderUsers = async () => {
  const usersService = IoCContainer.resolve("users");
  const users = await usersService.getUsers();
  const listNode = document.getElementById("users-list");

  users.forEach((user: User) => {
    const listItemNode = document.createElement("li");
    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  delete (window as any).__CONFIG__;
  renderUsers();
};

window.onload = (_event: Event) => {
  const logger = IoCContainer.resolve("logger");
  logger.info("Page is loaded.");
  app();
};
