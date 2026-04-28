import re

with open('_config.yml', 'r') as f:
    content = f.read()

# Fix description (must preserve the > YAML multiline format)
content = re.sub(
    r'description: >.*?\nfooter_text:',
    'description: > # the ">" symbol means to ignore newlines until "footer_text:"\n  Visiting Researcher at Boston University. Efficient training, federated learning, sim-to-real robotics.\nfooter_text:',
    content,
    flags=re.DOTALL
)

# Add email field after last_name
if 'email:' not in content[:500]:
    content = re.sub(r'(last_name: Wen\n)', r'\1email: qfwen@bu.edu\n', content)

# Add social links after the site settings block - find a good insertion point
# Look for where scholar settings would go (usually in a separate section)
if 'scholar_userid:' not in content:
    # Find the end of basic site settings and add social section
    insertion_point = content.find('# -----------------------------------------------------------------------------\n# Theme')
    if insertion_point > 0:
        social_block = '''
# -----------------------------------------------------------------------------
# Social integration
# -----------------------------------------------------------------------------

scholar_userid: -YHHQvkAAAAJ
github_username: wenqifu
linkedin_username: danny-wen-51a567290
orcid_id: 0009-0009-8458-144X

'''
        content = content[:insertion_point] + social_block + content[insertion_point:]

with open('_config.yml', 'w') as f:
    f.write(content)

print("Config updated successfully")
