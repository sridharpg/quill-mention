import Quill from "quill";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();

    if(data.denotationChar && data.denotationChar.length) {
      const denotationChar = document.createElement("span");
      denotationChar.className = "ql-mention-denotation-char";
      denotationChar.innerHTML = data.denotationChar;
      node.appendChild(denotationChar);
    }

    node.innerHTML += data.value;
    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    domNode.classList.add(`mention_${data.id}`);
    return domNode;
  }

  static value(domNode) {
    let allValues = MentionBlot.getAllValues();
    let classes = domNode.getAttribute('class').split(' ');
    let mentionCls = classes.find((c) => {
      return c.startsWith('mention_');
    });

    let value = mentionCls? mentionCls.replace('mention_', ''): '';
    return allValues.find((e1) => {return e1.id === value}) || {
      id: value, value: value
    }
  }
}

MentionBlot.getAllValues = function() {return [];};
MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
MentionBlot.className = "mention";

Quill.register(MentionBlot);

export default MentionBlot;