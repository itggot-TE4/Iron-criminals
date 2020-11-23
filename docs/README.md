[![Actions Status](https://github.com/itggot-TE4/TE4/workflows/tests/badge.svg)](https://github.com/itggot-TE4/Yala/actions)

# Iron-Criminals Log-O-Matic

This is a small Vue based project aimed at simplifying the task of reviewing students daily journals.

## Getting started

After cloning the repo you will need to navigate into the `lib` folder from where you will need to run the following command.

```text
npm install
```

To get it running you can then use one of the following commands, depending on you intentions.

### Hot-reloads for development

```text
npm run serve
```

### Compiles and minifies for production

```text
npm run build
```

### Runs all unit tests

```text
npm run test:unit
```

### Lints and fixes potential issues

```text
npm run lint
```

## Developing

### Code review

This project utilizes Code Reviews to hopefully prevent some bugs from being merged into the `dev` and `master` branch.
Before a pull request is merged the code needs to be review by atleast one member of the Iron-Criminals team. But what is a code review and how is it performed?

Code review is the process that happens after a new pull request is created and before the changes are merged to `dev`. It's a powerful tool for knowledge transfer. Use the following guidelines as a reference: https://github.com/thoughtbot/guides/tree/master/code-review

### Documentation

Self-documenting code is something to aim for. Types are the simplest and best documentation, improve legibility due to their well-defined meaning, and are checked at compile time<sup>1</sup>. We prefer complex code to be documentet inline to help other undrestand it. For documentation not suited for inlining the documentation should be wriiten in a markdown file in the `docs` folder and linked to in the `_navbar.md` file. This makes it available on our GitHub pages: <https://itggot-te4.github.io/Iron-crimals/>

### Testing

Every developer has heard of how useful tests are but to actually think in a TDD manner is something entirely different. Consider the different types of tests explained here when thinking about what test you should write: <https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html>

### Continious integration

Every commit that is pushed to the remote should be free of syntax errors and should still pass the "build" phase + basic tests. To reinforce testing into an application a CI pipeline ishas been put in place to check every commit and if it breaks something.

### Refactoring

Refactoring is the process of improving the design of existing code without altering its external behavior. It's a critical step in the process, but often overlooked <sup>2</sup>. That´s why we strive to provide qualitative code reviews, to make sure the technical-depth is keept managable.

### Git flow

- Don't push to master, use a develop branch

<sup>1</sup>: [ioscpp guidelines](https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md).  
<sup>2</sup>: <https://thoughtbot.com/playbook/developing/refactoring>
