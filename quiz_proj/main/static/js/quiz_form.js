document.addEventListener('DOMContentLoaded', function () {
  const quesContainer = document.getElementById('ques_set_area');
  const answerTemplate = document.getElementById('answer-template').innerHTML;
  const addQuesBtn = document.getElementById('add-ques');
  const totalQuesForms = document.querySelector('input[name="question_set-TOTAL_FORMS"]');

  function setupAddAnswerButton(quesBlock) {
    const addBtn = quesBlock.querySelector('.add-answer');
    const ansArea = quesBlock.querySelector('.ans-area');
    const totalInput = ansArea.querySelector('input[name$="-TOTAL_FORMS"]');

    if (!addBtn || !ansArea || !totalInput) return;

    addBtn.onclick = function () {
      const formIndex = parseInt(totalInput.value, 10);
      const prefix = ansArea.dataset.prefix;

      const newHtml = answerTemplate.replace(/__prefix__/g, `${prefix}-${formIndex}`);
      const wrapper = document.createElement('div');
      wrapper.classList.add('ans-form', 'bg-secondary', 'rounded', 'p-3', 'mb-3');
      wrapper.innerHTML = newHtml;

      ansArea.appendChild(wrapper);
      totalInput.value = formIndex + 1;
    };
  }

  function setupRemoveButtons() {
    document.addEventListener('click', function (e) {
      // Удаление ответа
      if (e.target.classList.contains('remove-answer')) {
        const ansForm = e.target.closest('.ans-form');
        const deleteInput = ansForm.querySelector('input[name$="-DELETE"]');
        if (deleteInput) {
          deleteInput.checked = true;
          ansForm.style.display = 'none';
        } else {
          ansForm.remove();
        }
      }

      // Удаление вопроса
      if (e.target.classList.contains('remove-question')) {
        const quesForm = e.target.closest('.ques-form');
        const deleteInput = quesForm.querySelector('input[name$="-DELETE"]');
        if (deleteInput) {
          deleteInput.checked = true;
          quesForm.style.display = 'none';
        } else {
          quesForm.remove();
        }
      }
    });
  }

  // Инициализация для уже существующих блоков
  document.querySelectorAll('.ques-form').forEach((block, index) => {
    const ansArea = block.querySelector('.ans-area');
    if (ansArea) {
      const mgmt = ansArea.querySelector('input[name$="-TOTAL_FORMS"]');
      const prefixMatch = mgmt?.name?.match(/^ans_(\d+)-/);
      if (prefixMatch) {
        ansArea.dataset.prefix = `ans_${prefixMatch[1]}`;
      }
    }
    setupAddAnswerButton(block);
  });

  setupRemoveButtons();

  // Добавление нового вопроса
  addQuesBtn.addEventListener('click', function () {
    const currentQuesCount = parseInt(totalQuesForms.value);
    const firstQues = document.querySelector('.ques-form');
    if (!firstQues) return;

    const newQues = firstQues.cloneNode(true);

    // Очистка значений
    newQues.querySelectorAll('input, textarea, label').forEach(el => {
      if (el.name) el.name = el.name.replace(/question_set-\d+-/, `question_set-${currentQuesCount}-`);
      if (el.id) el.id = el.id.replace(/question_set-\d+-/, `question_set-${currentQuesCount}-`);
      if (el.htmlFor) el.htmlFor = el.htmlFor.replace(/question_set-\d+-/, `question_set-${currentQuesCount}-`);
      if (el.type !== 'checkbox') el.value = '';
      if (el.checked) el.checked = false;
    });

    const ansArea = newQues.querySelector('.ans-area');
    ansArea.innerHTML = '';
    ansArea.dataset.prefix = `ans_${currentQuesCount}`;

    const totalAnsInput = document.createElement('input');
    totalAnsInput.type = 'hidden';
    totalAnsInput.name = `ans_${currentQuesCount}-TOTAL_FORMS`;
    totalAnsInput.id = `id_ans_${currentQuesCount}-TOTAL_FORMS`;
    totalAnsInput.value = '0';
    ansArea.appendChild(totalAnsInput);

    quesContainer.appendChild(newQues);
    setupAddAnswerButton(newQues);

    totalQuesForms.value = currentQuesCount + 1;
  });
});
