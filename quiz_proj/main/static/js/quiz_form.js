document.addEventListener('DOMContentLoaded', function () {
    // if (!ansArea) {
    //     console.warn('Не найдена ans-area при клонировании вопроса');
    // }
    // if (!totalAnsForms) {
    //     console.warn('Не найден TOTAL_FORMS внутри ans-area');
    // }
    const quesContainer = document.getElementById('ques_set_area');
    const totalQuesForms = document.getElementById('id_question_set-TOTAL_FORMS');

    // === Добавление вопроса ===
    document.getElementById('add-ques').addEventListener('click', function () {
        const currentQuesCount = parseInt(totalQuesForms.value);
        const firstQuesForm = document.querySelector('.ques-form');
        const newQuesForm = firstQuesForm.cloneNode(true);

        // Очистить поля и обновить индексы
        newQuesForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.value = '';
            input.name = input.name.replace(/question_set-(\d+)-/, `question_set-${currentQuesCount}-`);
            input.id = input.id.replace(/question_set-(\d+)-/, `question_set-${currentQuesCount}-`);
        });

        // Обработка форм ответов
        const ansArea = newQuesForm.querySelector('.ans-area');
        const totalAnsForms = ansArea.querySelector('input[name$="-TOTAL_FORMS"]');
        const ansForms = ansArea.querySelectorAll('.ans-form');

        ansForms.forEach((form, i) => {
            if (i === 0) {
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.value = '';
                    input.name = input.name.replace(/answer_set-\d+-(\d+)-/, `answer_set-${currentQuesCount}-0-`);
                    input.id = input.id.replace(/answer_set-\d+-(\d+)-/, `answer_set-${currentQuesCount}-0-`);
                });
            } else {
                form.remove();
            }
        });

        totalAnsForms.name = `answer_set-${currentQuesCount}-TOTAL_FORMS`;
        totalAnsForms.id = `id_answer_set-${currentQuesCount}-TOTAL_FORMS`;
        totalAnsForms.value = 1;

        totalQuesForms.value = currentQuesCount + 1;
        quesContainer.appendChild(newQuesForm);
    });

    // === Делегирование для добавления и удаления ответов/вопросов ===
    quesContainer.addEventListener('click', function (e) {
        // === Добавить ответ ===
        if (e.target.classList.contains('add-answer')) {
            const quesForm = e.target.closest('.ques-form');
            const ansArea = quesForm.querySelector('.ans-area');
            const totalAnsForms = ansArea.querySelector('input[name$="-TOTAL_FORMS"]');
            const currentAnsCount = parseInt(totalAnsForms.value);
            const firstAnsForm = ansArea.querySelector('.ans-form');
            const newAnsForm = firstAnsForm.cloneNode(true);

            const quesIndexMatch = quesForm.innerHTML.match(/question_set-(\d+)-/);
            const quesIndex = quesIndexMatch ? quesIndexMatch[1] : '0';

            newAnsForm.querySelectorAll('input, textarea').forEach(input => {
                input.value = '';
                input.name = input.name.replace(/answer_set-\d+-(\d+)-/, `answer_set-${quesIndex}-${currentAnsCount}-`);
                input.id = input.id.replace(/answer_set-\d+-(\d+)-/, `answer_set-${quesIndex}-${currentAnsCount}-`);
            });

            totalAnsForms.value = currentAnsCount + 1;
            ansArea.appendChild(newAnsForm);
        }

        // === Удалить вопрос ===
        if (e.target.classList.contains('remove-question')) {
            const quesForm = e.target.closest('.ques-form');
            quesForm.remove();

            // Обновляем индексы всех вопросов после удаления
            document.querySelectorAll('.ques-form').forEach((form, index) => {
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.name = input.name.replace(/question_set-\d+-/, `question_set-${index}-`);
                    input.id = input.id.replace(/question_set-\d+-/, `question_set-${index}-`);
                });

                // Обновить формы ответов
                const ansArea = form.querySelector('.ans-area');
                const ansForms = ansArea.querySelectorAll('.ans-form');
                ansForms.forEach((ansForm, i) => {
                    ansForm.querySelectorAll('input, textarea').forEach(input => {
                        input.name = input.name.replace(/answer_set-\d+-(\d+)-/, `answer_set-${index}-${i}-`);
                        input.id = input.id.replace(/answer_set-\d+-(\d+)-/, `answer_set-${index}-${i}-`);
                    });
                });

                const totalAnsInput = ansArea.querySelector('input[name$="-TOTAL_FORMS"]');
                totalAnsInput.name = `answer_set-${index}-TOTAL_FORMS`;
                totalAnsInput.id = `id_answer_set-${index}-TOTAL_FORMS`;
            });

            // Обновляем общее количество
            document.getElementById('id_question_set-TOTAL_FORMS').value = document.querySelectorAll('.ques-form').length;
        }

        // === Удалить ответ ===
        if (e.target.classList.contains('remove-answer')) {
            const ansForm = e.target.closest('.ans-form');
            const ansArea = e.target.closest('.ans-area');
            ansForm.remove();

            // Обновить индексы всех ответов
            const quesIndexMatch = ansArea.innerHTML.match(/answer_set-(\d+)-/);
            const quesIndex = quesIndexMatch ? quesIndexMatch[1] : '0';

            const ansForms = ansArea.querySelectorAll('.ans-form');
            ansForms.forEach((form, i) => {
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.name = input.name.replace(/answer_set-\d+-(\d+)-/, `answer_set-${quesIndex}-${i}-`);
                    input.id = input.id.replace(/answer_set-\d+-(\d+)-/, `answer_set-${quesIndex}-${i}-`);
                });
            });

            ansArea.querySelector('input[name$="-TOTAL_FORMS"]').value = ansForms.length;
        }
    });
});
